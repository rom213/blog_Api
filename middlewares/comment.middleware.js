const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.commentExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({
    where: {
      id,
      status: 'active',
    },
    include:[
      {
        model:User,
      },
      {
        model:Post
      }
    ]
  });

  if (!comment) {
    return next(new AppError(`Comment with id: ${id} not found`, 404));
  }

  req.comment = comment;
  next();
});
