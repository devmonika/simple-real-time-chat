/* eslint-disable no-undef */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {  addDoc,  onSnapshot, getFirestore, orderBy, query, serverTimestamp, collection } from 'firebase/firestore';
import {auth, app} from '../Firebase';
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

const db = getFirestore(app);


function App() {
  const [user, setUser] = useState(null)
  const [msgs, setMsg] = useState([])
  const [newMsg, setNewMsg] = useState("")

  useEffect(()=>{
    const q = query(collection(db,"msg"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, snapshot =>{
      setMsg(snapshot.docs.map( doc=> ({
        id:doc.id,
        data:doc.data()
      })))
    })
    return unsubscribe;
  },[])

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
    })
  },[])

  const sendMsg = async()=>{
    await addDoc(collection(db,"msg"),{
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMsg,
      timestamp: serverTimestamp()
    })
    setNewMsg("")
  }

  const handleGoogleLogin = async() =>{
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } 
    catch (error) {
      console.log(error); 
    }
  }

  return (
    <div className='msngrbody'>
      {
        user ? (
          <>
          <span className='loginName'><span> {user.displayName}</span></span>
          <button onClick={()=> auth.signOut()}>LogOut</button> <br/>
         
          
          {msgs.map(msg=>(
            <div className='user' key={msg.id}>
              <img className='userphoto' src={msg.data.photoURL}/>
              <span>{msg.data.text}</span>
            </div>)
          )}
           <input className='msgin'
           placeholder='Type Here.....'
          value={newMsg}
          onChange={e=>setNewMsg(e.target.value)}
          />
          <button onClick={sendMsg}>Send</button> <br/>
          
          </>
          
        ):
        <button onClick={handleGoogleLogin}>Google login</button>
      }
    
    </div>
  )
}

export default App
