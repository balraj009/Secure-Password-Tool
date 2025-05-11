import {useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);  

  let handleInputRange = (e) => {
    setLength(e.target.value)
  }

  let handleInputCheckbox1 = () => {
    setNumber((prev) => !prev)
  };

  let handleInputCheckbox2 = () => {
    setCharacter((prev) => !prev)
  };

  let passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(character){
      str += "!@#$%^&*()_+{}[]~`";
    }

    if(number){
      str += "0123456789";
    }

    let pass = "";

    for(let i = 1; i <= length; i++){
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [setPassword, length, character, number]);

  let copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, character, number, passwordGenerator]);

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-blue-400 to-teal-500 flex justify-center items-center">

            <div className="flex flex-col justify-center items-center bg-gray-50 text-black p-5 rounded-lg shadow-lg">
              <h1 className="text-5xl font-bold text-center">Secure Password Tool</h1>

              <div className='flex w-full justify-center space-x-5 mt-8'>
              <input
                type='text' 
                value={password}
                className='w-80 p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition duration-200'
                placeholder='Password'
                readOnly
                ref={passwordRef}
              />
              <button 
                className='text-white bg-gradient-to-r from-blue-400 to-teal-500 hover:from-teal-500 hover:to-blue-400 px-3 py-2 rounded'
                onClick={copyPasswordToClipboard}
                > Copy</button>
            </div>

            <div className='flex flex-col justify-center items-center mt-8'>
              
              <div className="flex items-center gap-x-3">
                <input
                  type="range"
                  id="inputRange"
                  min="8"
                  max="20"
                  value={length}
                  className="w-60 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  onChange={handleInputRange}
                />
                <label htmlFor="inputRange" className="text-sm font-medium text-gray-700">
                  Length: {length}
                </label>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="inputCheckbox1"
                  defaultChecked={number}
                  onChange={handleInputCheckbox1}
                  className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                />
                <label htmlFor="inputCheckbox1" className="text-sm font-medium text-gray-700 cursor-pointer mr-5">
                  Number
                </label>

                <input 
                  type="checkbox"
                  id='inputCheckbox2'
                  defaultChecked={character}
                  onChange={handleInputCheckbox2}
                  className='w-4 h-4 accent-blue-500 rounded cursor-pointer'
                />
                <label htmlFor="inputCheckbox2" className='text-sm font-medium text-gray-700 cursor-pointer'>Character</label>
                
              </div>

            </div>
            </div>
            
      </div>
    </>
  )
}

export default App
