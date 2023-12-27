// import icons
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import mui templates
import { Box, IconButton, Typography, useTheme } from "@mui/material";

// redux 
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

// components
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// navigation
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {

        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            header: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        // bug 0: going to friend profile from user and then the profile from their page
                        // components will not re-render
                        navigate(`/profile/${friendId}`);
                        navigate(0); // bug 0: temporary edge case bug fix
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color:primaryDark}} />
                ) :
                    <PersonAddOutlined sx={{ color:primaryDark}} />}
            </IconButton>
        </FlexBetween>
    )
}

export default Friend;