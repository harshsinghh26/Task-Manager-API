import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// Generate Tokens

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, 'Somthing went wrong while generating tokens!!');
  }
};

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

// User Login

const userLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!(username || email)) {
    throw new ApiError(400, 'Email or username is required!!');
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, 'User not Found');
  }

  const isPassword = await user.isPasswordCorrect(password);

  if (!isPassword) {
    throw new ApiError(401, 'Password is wrong!!');
  }

  const { refreshToken, accessToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    '-password, -refreshToken',
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, refreshToken, accessToken },
        'User logged In Successfully!!',
      ),
    );
});

export { registerUser, userLogin };
