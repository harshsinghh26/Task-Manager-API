import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// User registration

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [email, fullName, username, password].some((field) => {
      field?.trim() === '';
    })
  ) {
    throw new ApiError(400, 'All fields are required!!');
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    throw new ApiError(409, 'User already Exist!!');
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering user!!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, 'User Register Successfuly!!'));
});

export { registerUser };
