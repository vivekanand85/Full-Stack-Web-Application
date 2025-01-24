
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });
const Post = require('../model/Post');


router.post('/create', upload.single('image'), async (req, res) => {
    const { caption, userId } = req.body; 
    console.log(caption,"caption<-userId",userId,"image");
    try {
        const post = new Post({
            caption,
            imageUrl: req.file.path, 
            user: userId,
            
        });
        console.log(caption,"caption<-userId",userId,"post",post);
        
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error creating post' });
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name'); 
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

module.exports = router;
