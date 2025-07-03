const express = require('express');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.use(express.static('webapp'));

app.post('/api/enhance', upload.array('photos', 5), async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const enhancedUrls = [];

    for (const file of req.files) {
      // Example call to OpenAI image edit (pseudo-code)
      const response = await openai.createImageEdit(
        fs.createReadStream(file.path),
        process.env.PROMPT || 'brighten and enhance the vehicle photo for marketing',
        1,
        '1024x1024'
      );
      const imageUrl = response.data.data[0].url;
      enhancedUrls.push(imageUrl);
      // Store image URL in Supabase
      await supabase.from('images').insert({ user_id: userId, url: imageUrl });
    }

    res.json({ images: enhancedUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
