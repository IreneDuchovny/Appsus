
const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'


export function MailDetails({onDeleteMail}) {
 
      const [mail, setMail] = useState(null)
      const { mailId } = useParams()
      const navigate = useNavigate()

      useEffect(() => {
         loadMail()
      }, [])
 
 function loadMail() {
      mailService.getMailById(mailId)
            .then(mail => {
               setMail(mail)
            })
   }
    if (!mail) return <div>Loading...</div>
    return <div className="full-details-mail">
         <div className="title-mail flex space-between"> <h3 className="email-subject">{mail.subject} </h3>
         <div className="icons-btns">
         <button className="back fa fa-arrow-left" onClick= {()=> navigate('/mail')} ></button>
         <button className="fa fa-trash-o" title="Delete email" onClick={()=>onDeleteMail(mail.id)}></button>
         </div>
         </div>
            <p className="from-email">from: {mail.name} {`<${mail.to}>`}</p>
            <p className="to-email">To: me</p>
            <p className="email-body">{mail.body}</p>
         </div>
    
    
  
}

//can delete an email(service)
//allow navigate back to list(mark as read)
//routble component
