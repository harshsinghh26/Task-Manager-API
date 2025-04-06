import { Task } from '../models/task.models.js';
import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

const createTask = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  //   console.log(user.username);
  if (!user) {
    throw new ApiError(401, 'Unauthorized Access!!');
  }

  const { title, description } = req.body;

  if (!(title && description)) {
    throw new ApiError(400, 'Both Fields are required!!');
  }

  const createdTask = await Task.create({
    title,
    description,
    user: user._id,
  });

  if (!createdTask) {
    throw new ApiError(500, 'Something went wrong while creating the task!!');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdTask, user: user.username },
        'Task has created success fully',
      ),
    );
});

export { createTask };
