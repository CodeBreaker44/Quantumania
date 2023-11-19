import '../scss/styles.scss'
import '../css/styles.css'
import Swal from 'sweetalert2'
import ClientMonitor from 'skywalking-client-js';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Transition, CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import FadeIn from "react-fade-in";
import Fade from 'react-reveal/Fade';
import axios from 'axios';




const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: "inline-block",
//   backgroundColor: "#b3d0ff"
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const h1DefaultStyle = {
  transition: `transform 500ms ease-in-out`,
};

const h1TransitionStyles = {
  inactive: { transform: 'scale(1)' },
  active: { transform: 'scale(0.5)' }, 
};


function SplitScreen() {
const [inProp, setInProp] = useState(false);
const [selectedSide, setSelectedSide] = useState(null);
const [h1Visible , setH1Visible] = useState({left: true, right: true});
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [cardName, setCardName] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [expiration, setExpiration] = useState('');
const [securityCode, setSecurityCode] = useState('');

const handleChange = (e) => {
  const { name, value } = e.target;
  switch (name) {
    case 'name':
      setName(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'cardName':
      setCardName(value);
      break;
    case 'cardNumber':
      setCardNumber(value);
      break;
    case 'expiration':
      setExpiration(value);
      break;
    case 'securityCode':
      setSecurityCode(value);
      break;
    default:
      break;
  } 
}

const handleSubmitLeft = async (e) => {
  e.preventDefault();
  const formData = {cardName,cardNumber,expiration,securityCode};
  try{
    const response = await axios.post('/api/creditcard', formData);
    console.log(response);
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully logged in!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }
  catch(error){
    console.log(error);
    Swal.fire({
      title: 'Error!',
      text: 'Invalid username or password!',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
}

const handleSubmitRight = async (e) => {
e.preventDefault();
const formData = {name,password};
console.log(formData); 
try {
  const response = await axios.post('/api/password', formData);
  console.log(response);  
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully logged in!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
} catch (error) {
  console.log(error);
  
    Swal.fire({
      title: 'Error!',
      text: 'Invalid username or password!',
      icon: 'error',
      confirmButtonText: 'Cool'
    })

}
}

const handleSideSelection = (side) => {

if (selectedSide === side) return;
else
{
setSelectedSide(side);
setInProp(true);
setH1Visible(prev => ({ ...prev, [side]: true }));
}
};

const resetSelection = () => {
  setSelectedSide(null);
  setInProp(false);
  setH1Visible({ left: true, right: true });
};

return (
<div className="d-flex" style={{ height: '70vh' }}>
    
    <div className="flex-grow-1 d-flex justify-content-center align-items-center" onClick={()=>
        handleSideSelection('left')}
        style={{ cursor: 'pointer', backgroundColor: selectedSide === 'left' ? '#FF2E63' : '#3F72AF' }}
        >
        <h1 style={{ ...h1DefaultStyle, ...(selectedSide === 'left' ? h1TransitionStyles.active : h1TransitionStyles.inactive) }}>
          Password
        </h1>
        {selectedSide === 'left' && (
        <Transition in={inProp} timeout={duration} onExited={resetSelection}>
            {(state) => (
              <FadeIn>
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {/* Form for the left side */}
                
                <form id="test" onSubmit={handleSubmitRight}>
                  <Fade bottom>
                  <label htmlFor=""> User Name</label>
                    <input type="text" placeholder="Username" className="form-control" value={name} name="name" onChange={handleChange}/>
                    <br />
                    <label htmlFor=""> Password</label>
                    <input type="text" placeholder="Password" className="form-control" value={password} name="password" onChange={handleChange}/>
                    <br />
                    <button typeof='submit' className='btn btn-primary'>Submit</button>
                    </Fade>
                </form>
                
            </div>
            </FadeIn>
            )}
        </Transition>
        )}
    </div>
    
    <div className="flex-grow-1 d-flex justify-content-center align-items-center" onClick={()=>
        handleSideSelection('right')}
        style={{ cursor: 'pointer', backgroundColor: selectedSide === 'right' ? '#61A3BA' : '#212529' }}
        >
        <h1  className="fade-in-element" style={{ ...h1DefaultStyle, ...(selectedSide === 'right' ? h1TransitionStyles.active : h1TransitionStyles.inactive) }}>
          Credit Cards
        </h1>
        {selectedSide === 'right' && (
        <Transition in={inProp} timeout={duration}>
            {(state) => (
              <FadeIn>
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {/* Form for the right side */}
                <form onSubmit={handleSubmitLeft}>
                  <Fade bottom>
                  <label htmlFor="">Name</label>
                    <input type="text" placeholder="Name" className="form-control" value={cardName} name="cardName" onChange={handleChange}/>
                    <br />
                    <label htmlFor="">Card Number</label>
                    <input type="text" placeholder="Card Number" className="form-control" value={cardNumber} name="cardNumber" onChange={handleChange}/>
                    <br />
                    <label htmlFor="">Expiration (mm/yy)</label>
                    <input type="text" placeholder="Expiration" className="form-control" value={expiration} name="expiration" onChange={handleChange}/>
                    <br />
                    <label htmlFor="">Security Code </label>
                    <input type="text" placeholder="Security Code" className="form-control" value={securityCode} name="securityCode" onChange={handleChange}/>
                    <br />
                    <button typeof='submit' className='btn btn-success' >Submit</button>
                    </Fade>
                </form>
            </div>
            </FadeIn>
            )}
        </Transition>
        )}
    </div>
</div>
);
}

export default SplitScreen;