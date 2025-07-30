import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setnumAllow] = useState(false);  
  const [spcharAllow, setspcharAllow] = useState(false); 
  const [password, setpassword] = useState(""); 

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllow) str += "0987654321";
    if (spcharAllow) str += "!@#$%^&*():<>?,./|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numAllow, spcharAllow, setpassword]);

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, spcharAllow, passwordGenerator])
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center px-4'>
        <div className='w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8'>
          <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Password Generator
          </h1>

          <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden mb-6'>
            <input 
              type="text"
              value={password}
              className='w-full px-4 py-3 text-lg text-gray-800 outline-none'
              placeholder='Your password'
              readOnly
              ref={passwordRef}
            />
            <button
            onClick={copytoclipboard}
            className='w-30 bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-100'>
              Copy
            </button>
          </div>

          <button 
            onClick={passwordGenerator}
            className='w-full bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-100 mb-6'
          >
            Generate Password
          </button>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <label className='text-gray-700'>Password Length</label>
              <input
                type="range"
                min="4"
                max="20"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className='w-2/3'
              />
              <span className='ml-2 font-bold text-gray-900'>{length}</span>
            </div>

            <div className='flex items-center justify-between'>
              <label className='text-gray-700'>Include Numbers</label>
              <input
                type="checkbox"
                checked={numAllow}
                onChange={() => setnumAllow(!numAllow)}
                className='w-5 h-5'
              />
            </div>

            <div className='flex items-center justify-between'>
              <label className='text-gray-700'>Include Special Characters</label>
              <input
                type="checkbox"
                checked={spcharAllow}
                onChange={() => setspcharAllow(!spcharAllow)}
                className='w-5 h-5'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
