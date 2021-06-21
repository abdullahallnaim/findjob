import React from 'react';
// import emailjs from 'emailjs-com';

const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    //     if(document.getElementById('email').value == '' && document.getElementById('name').value == '' && document.getElementById('message').value == ''){
    //         alert('You must fill all the fields')
    //       }
    //       else{
    //         emailjs.sendForm('service_a3il6aj', 'template_52hpdpw', e.target, 'user_2v9sentTANCCH78czyxeH')
    //   .then(function(response) {
    //       console.log(response)
    //     if(response){
    //       alert('You have successfully sent me an email')
    //       document.getElementById('contact-form').reset()
    //     }
        
    //   })
    //       }    
      };
    return (
        <div style={{ backgroundColor: '#102040', marginTop: '150px', paddingBottom: '50px'}}>
            <div className='container pt-5'>
                <div className='row'>
                    <div className='col-md-6 col-12 text-left' data-aos='fade-right'>
                        <h1 className='font-weight-bold text-white'>We are here<br />to solve your issues</h1>
                        <p className='text-white'>If you have any questions feel free to email us.</p>
                    </div>
                    <div className='col-md-6 col-12' data-aos='fade-left'>
                        <form className='text-left' id='contact-form'  onSubmit={handleSubmit}>
                            <div className = "form-group text-left my-2">
                                <input type="email" className = "form-control" id="email" name='f_email' aria-describedby="emailHelp" placeholder="Your emai address" />
                            </div>
                            <div className = "form-group text-left my-2">
                                <input type="text" className = "form-control" id="name" name='f_name' placeholder="Your name/ company's name" />
                            </div>
                            <div className = "form-group text-left my-2">
                                <textarea className = "form-control" id="message" name='f_message' rows="10" placeholder='Your message '></textarea>
                            </div>
                            <button className = "btn btn-warning px-5 font-weight-bold">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            <p className = "mt-5 text-dark text-center">copyright Food Scape 2020</p>
        </div>
    );
};

export default Footer;