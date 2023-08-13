const AUTHENTICATED_LOCAL_KEY = "LOGGED_IN";

export function isAuthenticated() {
  return !!localStorage.getItem(AUTHENTICATED_LOCAL_KEY);
}

export function updateAuthenticated() {
  localStorage.setItem(AUTHENTICATED_LOCAL_KEY, 1);
  location.reload();
}

export function logout() {
  localStorage.removeItem(AUTHENTICATED_LOCAL_KEY);
  location.reload();
}
