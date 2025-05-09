import fs from 'fs';
  import path from 'path';
  
  const DB_PATH = path.join(__dirname, '../db/users.json');
  
  function readUsers() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }
  
  function writeUsers(users: any[]) {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
  }
  
  export function getAllUsers() {
    try {
      return readUsers();
    } catch (error: any) {
      console.log(`[getAllUsers error] : ${error.message}`);
    }
  }
  
  export function createUser(name: string) {
    const users = readUsers();
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
    };
    users.push(newUser);
    writeUsers(users);
    return newUser;
  }
  
  export function deleteUserById(id: number) {
    const users = readUsers();
    const index = users.findIndex(
      (u: { id: number; name: string }) => u.id === id
    );
    if (index === -1) return false;
    users.splice(index, 1);
    writeUsers(users);
    return true;
  }
  