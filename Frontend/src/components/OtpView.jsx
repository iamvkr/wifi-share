import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useMyContext } from '@/Provider/Context'


const OtpView = ({ isDisabled }) => {
    const { pin, setPin } = useMyContext();

    return (
        <InputOTP maxLength={4}
            value={pin}
            onChange={(pin) => setPin(pin)}
            disabled={isDisabled}
            
        >
            <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-white" />
                <InputOTPSlot index={1} className="bg-white"/>
                <InputOTPSlot index={2} className="bg-white"/>
                <InputOTPSlot index={3} className="bg-white"/>
            </InputOTPGroup>
        </InputOTP>

    )
}

export default OtpView