import Navbar from "scenes/navbar";

// widgets
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";

// mui and redux
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                p="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={ _id } picturePath={ picturePath } />
                </Box>
                <Box 
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                </Box>
                {isNonMobileScreens && <Box flexBasis="26%"></Box>}
            </Box>
        </Box>
    );
}

export default HomePage;