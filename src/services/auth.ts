import { User, UserCredentials } from '../types/user';

export class AuthService {
  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  private getStoredUsers(): Record<string, User & { password: string }> {
    const stored = localStorage.getItem(this.USERS_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  private saveUsers(users: Record<string, User & { password: string }>): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  async register(credentials: UserCredentials & { name: string }): Promise<User> {
    const users = this.getStoredUsers();
    
    if (users[credentials.email]) {
      throw new Error('User already exists');
    }

    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      email: credentials.email,
      name: credentials.name,
      password: credentials.password, // In a real app, this should be hashed
      createdAt: new Date()
    };

    users[credentials.email] = newUser;
    this.saveUsers(users);

    const { password, ...userWithoutPassword } = newUser;
    this.setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  async login(credentials: UserCredentials): Promise<User> {
    const users = this.getStoredUsers();
    const user = users[credentials.email];

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;
    this.setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  logout(): void {
    this.setCurrentUser(null);
  }
}

export const authService = new AuthService(); 