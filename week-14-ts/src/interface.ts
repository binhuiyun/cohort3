interface Admin{
    name: string;
    permissions: string; 
}

interface User{
    name:string;
    age: number;

}

type UserOrAdmin = User | Admin;

function great(user: UserOrAdmin){
    console.log(user.name)
}

// types vs interface.    types can do & and | at root level
// abstract class vs interface 
// abstract class can have default functions