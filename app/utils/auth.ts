// Simple admin authentication utility
// In a real application, this would use a proper authentication system with database storage

// Admin credentials (in a real app, these would be securely stored in a database)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'siamoon2025',
};

// Check if the provided credentials match the admin credentials
export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

// Check if the user is logged in as admin (using localStorage for demo purposes)
export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) return false;
    
    const session = JSON.parse(adminSession);
    const expiryTime = new Date(session.expiresAt).getTime();
    const currentTime = new Date().getTime();
    
    return expiryTime > currentTime;
  } catch (error) {
    console.error('Error checking admin session:', error);
    return false;
  }
}

// Create an admin session (using localStorage for demo purposes)
export function createAdminSession(): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Set session to expire in 24 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    const session = {
      isAdmin: true,
      expiresAt: expiresAt.toISOString(),
    };
    
    localStorage.setItem('adminSession', JSON.stringify(session));
  } catch (error) {
    console.error('Error creating admin session:', error);
  }
}

// Clear the admin session
export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('adminSession');
  } catch (error) {
    console.error('Error clearing admin session:', error);
  }
}
