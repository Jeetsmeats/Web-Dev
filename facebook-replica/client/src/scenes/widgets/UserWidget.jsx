// import items
import {        // icons
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from '@mui/icons-material'; 

import { Box, Typography, Divider, useTheme } from '@mui/material';     // mui components

// custom components
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

// redux items
import { useSelector } from 'react-redux';

// react items
import { useEffect, useState } from 'react';

// navigation imports
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {

    const [user, setUser] = useState(null);     // add states

    const navigate = useNavigate();     // navigation
    const token = useSelector((state) => state.token);      // get token
    
    // page theme
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    // get user information
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        setUser(data);
    };
    
    
    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) { // no user

        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor:"pointer"
                            }
                            }}>
                            {firstName} {lastName}
                        </Typography>    
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>
                
            </FlexBetween>
        </WidgetWrapper>
    )
}