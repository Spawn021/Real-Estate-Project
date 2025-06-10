import clsx from 'clsx'
import { useEffect, useState } from 'react'
import InputField from '../input/InputField'
import { useForm } from 'react-hook-form'
import Button from '../commons/Button'
import InputRadio from '../input/InputRadio'
import { apiRegister, apiSignIn } from '@/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withRouter from '@/hocs/withRouter'
import { useModalStore } from '@/store/useModalStore'
import { useUserStore } from '@/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from '@/utils/firebaseConfig'

function Login({ navigate }) {
  const [variant, setVariant] = useState('login')
  const { setModal } = useModalStore()
  const [isLoading, setIsLoading] = useState(false)
  const { setToken, roles } = useUserStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    reset({
      phone: '',
      password: '',
      name: '',
      roleCode: '',
    })
  }, [variant, reset])

  const handleVerifyCaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {},
      'expired-callback': (response) => {},
    })
  }
  const handleSendOTP = (phone) => {
    handleVerifyCaptcha()
    const verifier = window.recaptchaVerifier
    const formattedPhone = phone.startsWith('+84') ? phone : `+84${phone.slice(1)}`

    signInWithPhoneNumber(auth, formattedPhone, verifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        Swal.fire({
          title: 'OTP Sent',
          text: 'Please enter the OTP sent to your phone number.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          const otp = prompt('Enter the OTP:')
          if (otp) {
            confirmationResult
              .confirm(otp)
              .then((result) => {
                console.log('OTP verified successfully', result)
                onSubmit(register.getValues())
              })
              .catch((error) => {
                console.error('Error verifying OTP:', error)
                toast.error('Invalid OTP. Please try again.')
              })
          }
        })
      })
      .catch((error) => {
        console.error('Error sending OTP:', error)
        toast.error('Failed to send OTP. Please try again.')
      })
  }

  const onSubmit = async (data) => {
    if (variant === 'register') {
      // if (data.roleCode !== 'ROLE7') {
      //   handleSendOTP(data.phone)
      // }
      setIsLoading(true)
      const response = await apiRegister(data)
      setIsLoading(false)
      if (response.success) {
        Swal.fire({
          title: 'Registration Successful',
          text: 'You can now log in with your account.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
        }).then(() => {
          reset()
          setVariant('login')
        })
      } else {
        toast.error(response.message || 'Registration failed. Please try again.')
      }
    }
    if (variant === 'login') {
      const { name, roleCode, ...payload } = data
      const response = await apiSignIn(payload)
      if (response.success) {
        setToken(response.accessToken)
        toast.success('Login successful!')
        setModal(false, null)
        navigate('/')
      } else {
        toast.error(response.message || 'Login failed. Please try again')
      }
    }
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-md text-lg px-4 py-8 flex-col w-[500px] items-center justify-center flex gap-6"
    >
      <div id="recaptcha-container" className="hidden"></div>
      <h1 className="text-3xl font-semibold">Welcome to REST06</h1>
      <div className="flex items-center gap-6 w-full justify-start border-b">
        <span
          className={clsx(
            variant === 'login' && 'border-b-4 border-main-700',
            'cursor-pointer',
          )}
          onClick={() => setVariant('login')}
        >
          Sign in
        </span>
        <span
          className={clsx(
            variant === 'register' && 'border-b-4 border-main-700',
            'cursor-pointer',
          )}
          onClick={() => setVariant('register')}
        >
          Sign up
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full px-4 "
      >
        <InputField
          register={register}
          id="phone"
          label="Phone Number"
          inputClassName="rounded-md"
          placeholder="Enter your phone number"
          validate={{
            required: 'Phone number is required',
            pattern: {
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: 'Phone number is not valid',
            },
          }}
          errors={errors}
        />
        <InputField
          register={register}
          id="password"
          type="password"
          label="Password"
          inputClassName="rounded-md"
          placeholder="Enter your password"
          validate={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          errors={errors}
        />
        {variant !== 'login' && (
          <>
            <InputField
              register={register}
              id="name"
              label="Full Name"
              inputClassName="rounded-md"
              placeholder="Enter your full name"
              validate={{
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
              }}
              errors={errors}
            />

            <InputRadio
              register={register}
              id="roleCode"
              label="Type Acount"
              inputClassName="rounded-md"
              validate={{
                required: 'Role is required',
              }}
              options={roles
                .filter((role) => role.code !== 'ROLE1')
                .map((role) => ({
                  value: role.code,
                  label: role.value,
                }))}
              errors={errors}
            />
          </>
        )}
        <Button type="submit" className="w-full py-2 mt-6 mb-1" isLoading={isLoading}>
          {variant === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 underline">
        Forgot your password?
      </span>
    </div>
  )
}
const LoginWithRouter = withRouter(Login)
export default LoginWithRouter
