import bcrtpt from 'bcrypt'

const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrtpt.hashSync('111111',10),
        isAdmin:true
    },
    {
        name:'sana',
        email:'sana@example.com',
        password:bcrtpt.hashSync('111111',10),
    },
    {
        name:'hana',
        email:'hana@example.com',
        password:bcrtpt.hashSync('111111',10),
    },
    {
        name:'fawas',
        email:'fawas32@gmail.com',
        password:bcrtpt.hashSync('111111',10),
    },
]

export default users