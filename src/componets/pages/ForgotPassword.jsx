import React from 'react'

function ForgotPassword() {
  return (
    <div className='container'>
      <div className='text-center'>
        <h1 className='mt-5'>استعادة كلمة المرور</h1>
        <p>أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
        <form className='w-50 mx-auto mt-4'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
            <input type="email" className="form-control" id="email" placeholder="أدخل بريدك الإلكتروني" />
          </div>
          <button type="submit" className="btn btn-primary w-100">إرسال رابط استعادة كلمة المرور</button>
        </form>
      </div>

    </div>
  )
}

export default ForgotPassword
