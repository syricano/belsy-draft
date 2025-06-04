import User from '../models/user.js';



// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }catch (error) {
        console.error("Error fetching Users:", error);
        res.status(500).json({ error: error.message});
    
    }
}

// Create a new user
export const createUser = async (req, res) => {
    try {
        const {
            body: {firstName, lastName, email, phone, password},
        } = req;
        if (!firstName || !lastName || !email || !password || ! phone)
            return res.status(400).json({ message: "All fields are required" });
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } 
        const user = await user.create(req.body);
        res.status(201).json(user);

    }catch (error) {
        console.error("Error creating User:", error);
        res.status(500).json({ error: error.message});
    }
}

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);

    }catch (error) {
        console.error("Error fetching User by ID:", error);
        res.status(500).json({ error: error.message });
    }
}

// Update an user

export const updateUser = async (req, res) => {
    try {
        const {
            body: {firstName, lastName, email, phone, password},
            params: { id }
        } = req;
        if (!firstName || !lastName || !email || !password || !phone)
            return res.status(400).json({ message: "All fields are required" });
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({error: "User not found"});
        await user.update(req.body);
        res.json(user);

    }catch (error) {
        console.error("Error updating User:", error);
        res.status(500).json({ error: error.message});
    }
}

// delete a user
export const deleteUser = async (req, res) => {
    try {
        const {
            params: { id }
        }= req;
        const user = await User.findByPk(id);
        if(!user)return res.status(404).json({error: "User not found"});
        await user.destroy();
        res.json({ message: "User deleted successfully" });        
    }catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: error.message});
    }
}

// Get your profile
export const getOwnProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching own profile:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update your profile
export const updateOwnProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        const { firstName, lastName, email, phone, password } = req.body;
        if (!firstName || !lastName || !email || !password || !phone)
            return res.status(400).json({ message: "All fields are required" });
        await user.update(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Error updating own profile:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete your profile
export const deleteOwnProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        await user.destroy();
        res.status(201).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting own profile:", error);
        res.status(500).json({ error: error.message });
    }
}