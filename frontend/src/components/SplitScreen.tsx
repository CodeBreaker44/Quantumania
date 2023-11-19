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

const defaultStyle = { // this is the default style for the transition
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: 20,
  display: "inline-block",
//   backgroundColor: "#b3d0ff"
};

const transitionStyles = { // these are the transition styles for the transition
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


function SplitScreen() { // this is the component that will be exported
const [inProp, setInProp] = useState(false); // this is the state variable that will be used to trigger the transition
const [selectedSide, setSelectedSide] = useState(null); // this is the state variable that will be used to determine which side is selected
const [h1Visible , setH1Visible] = useState({left: true, right: true}); // this is the state variable that will be used to determine which h1 is visible
const [name, setName] = useState(''); // this is the state variable that will be used to store the username
const [password, setPassword] = useState('');  // this is the state variable that will be used to store the password
const [cardName, setCardName] = useState(''); // this is the state variable that will be used to store the card name
const [cardNumber, setCardNumber] = useState(''); // this is the state variable that will be used to store the card number
const [expiration, setExpiration] = useState(''); // this is the state variable that will be used to store the expiration date
const [securityCode, setSecurityCode] = useState(''); // this is the state variable that will be used to store the security code

const handleChange = (e) => { // e is the event object passed from the input field
  const { name, value } = e.target; // destructuring the name and value from the target object
  switch (name) { // switch statement to determine which state variable to update
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

const handleSubmitLeft = async (e) => { //this is the function that will be called when the left form is submitted
  e.preventDefault();
  const formData = {cardName,cardNumber,expiration,securityCode}; // create an object with the form data
  try{
    const response = await axios.post('/api/creditcard', formData); // make a POST request to the server
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

const handleSubmitRight = async (e) => { //this is the function that will be called when the right form is submitted
e.preventDefault();
const formData = {name,password}; // create an object with the form data
console.log(formData); 
try {
  const response = await axios.post('/api/password', formData); // make a POST request to the server
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

const handleSideSelection = (side) => { // this function will be called when a side is selected

if (selectedSide === side) return;
else
{
setSelectedSide(side); // set the selected side
setInProp(true); // set the inProp to true to trigger the transition
setH1Visible(prev => ({ ...prev, [side]: true })); // set the h1Visible to true to trigger the transition
}
};

const resetSelection = () => { // this function will be called when the transition is complete
  setSelectedSide(null);
  setInProp(false);
  setH1Visible({ left: true, right: true });
};

return ( // return the JSX for the component
<div className="d-flex" style={{ height: '70vh' }}>
    
    <div className="flex-grow-1 d-flex justify-content-center align-items-center" onClick={()=>
        handleSideSelection('left')}
        style={{ cursor: 'pointer', backgroundColor: selectedSide === 'left' ? '#FF2E63' : '#3F72AF' }}
        >
        <h1 style={{ ...h1DefaultStyle, ...(selectedSide === 'left' ? h1TransitionStyles.active : h1TransitionStyles.inactive) }}>
          Password
        </h1>
        {selectedSide === 'left' && (
        <Transition in={inProp} timeout={duration} onExited={resetSelection}> {/* this is the transition component that will be used to trigger the transition */}
            {(state) => (
              <FadeIn>
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {/* Form for the left side */}
                
                <form id="test" onSubmit={handleSubmitRight}> {/* this is the form that will be submitted when the form is submitted */}
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

export default SplitScreen; // export the component to be used in other files (e.g. App.jsx)