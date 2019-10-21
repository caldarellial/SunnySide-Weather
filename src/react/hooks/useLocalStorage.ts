export function useLocalStorage() {
  function set(key: string, val: any): any{
    return localStorage.setItem(key, val);
  }
  
  function get(key: string): any{
    return localStorage.getItem(key);
  }
  
  function unset(key: string): any{
    return localStorage.removeItem(key);
  }

  return {get, set, unset};
}

export default useLocalStorage;