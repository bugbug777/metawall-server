const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    tags: [
      {
        type: String,
        required: [true, '貼文標籤不能為空 ']
      }
    ],
    type: {
      type: String,
      enum: ['person', 'group']
    },
    name: {
      type: String,
      required: [true, '使用者名稱為必填']
    },
    content: {
      type: String,
      required: [true, '貼文內容為必填']
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
  },
  {
    versionKey: false
  }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;