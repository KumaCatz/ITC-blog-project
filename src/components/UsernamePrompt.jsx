import { useEffect } from "react";

const [username, setUsername] = useState('');

useEffect(() => {
    setUsername(window.prompt('Username:'))
    return () => window.alert(`Bye ${ username }!`);
  }, [username]);
