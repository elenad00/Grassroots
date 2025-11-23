
async function submit_code(setErrorLine, code){
  const api = axios.create({baseURL: "/api/v1"});

  const error_messages = {
    "E061104": "Oops - looks like that code has expired",
    "E061103": "Oops - looks like you've tried too many times with that code",
  }
  const {error, data} = await api.get(
    "/auth/sign-in/otp/"+code, {
      headers: {"Authorization": unique_id}
    }
  )
  if (error){
    let e;
    try {e = error_messages[error.code]}
    catch (err){e="Looks like there was an error!"}
    console.log(
      `[${error.status}] ${error.code}: ${error.message}`
    )
    return e;
  } else {
    window.location.href = (
      data.cookie ? "/user/profile" : "/sign-up"
    )
  }
}

export function otp_input(){
  const [isLoading, setIsLoading] = useState(false);
  const [errorLine, setErrorLine] = useState(false);
  const [errorRaised, setErrorRaised] = useState(false);
  const inputRefs = Array.from({length: 6}, (v, k) => useRef(null));
  const inputArray = Array.from({length:6}, (v, k) => k);
  const inputs = inputArray.map((i) => (
    <input
      className={styles.input} key={i} type="string"
      maxLength={1} ref={inputRefs[i]} autoFocus={i === 0}
      onFocus={(e)=>{e.target.select()}}
      onKeyDown={(e) => handleInput(e, i)}
      onChange={(e) => handleInput(e, i)}
    />
  ))

  function check_code(){
    const code = inputRefs.map((r) => r.current.value);
    if(code.filter((value) => /[0-9]/.test(value)).length == 6){
      setIsLoading(true);
      const error = submit_code(code.join(''));
      setErrorLine(error);
      setIsLoading(false);
    } 
  }

  function format_cell(i, isValid){
    inputRefs[i].current.className = (isValid ? styles.input : styles.badInput);
    setErrorRaised(!isValid)
  }

  function handleInput(e, i){
    if (e.keyCode){
      if (e.keyCode == 8){
        format_cell(i, true)
        !e.target.value && i>0 && inputRefs[i-1].current.focus()
      }
    } else if (e.target.value){
      const isValid = /[0-9]/.test(e.target.value)
      format_cell(i, isValid)
      if (isValid){
        check_code();
        i<5 && inputRefs[i+1].current.select();
      }
    }
  };

  return (
    <PageContent page="sign-in-otp">
      <PageElement subclass={styles.otpContainer}>
        <div>
          {inputs.map((input) => input)}
        </div>
        <p className={`${styles.codeError} ${errorRaised && styles.codeErrorActive}`}>
          please ensure you enter only numbers
        </p>
      </PageElement>
      { isLoading && Loader }
      { errorLine &&
        <PageElement subclass={styles.otpError}>
          <p>{errorLine}</p>
          <NavButton content={{link:'/sign-in', title: 'Try Another Method'}} />
        </PageElement>
      }
    </PageContent>
  )
}