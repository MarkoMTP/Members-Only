

const loginController = async (req, res) {
    const user = req.user
    await alert(`Hello ${user.full_name}`)
    
}