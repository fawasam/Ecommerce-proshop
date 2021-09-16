import bcrtpt from 'bcrypt'

const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrtpt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'sana',
        email:'sana@example.com',
        password:bcrtpt.hashSync('123456',10),
    },
    {
        name:'hana',
        email:'hana@example.com',
        password:bcrtpt.hashSync('123456',10),
    },
    {
        name:'diya',
        email:'diya@example.com',
        password:bcrtpt.hashSync('123456',10),
    },
]

export default users