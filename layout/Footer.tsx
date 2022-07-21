import {
  Box, Heading, Grid, List, ListItem,
  useTheme,
} from "@chakra-ui/react"
import {BrandGithub, BrandYoutube, BrandTelegram, BrandLinkedin} from "tabler-icons-react"
import * as React from "react"
import {Link, WidthHolder} from "components"

// Footer
export function Footer(): JSX.Element {
  // TODO automate calc(1.2 * 20px)
  return <>
    <Box
      as="footer"
      background="white"
      borderTop="1px solid"
      borderTopColor="gray.300"
    >
      <WidthHolder>
        {/*<LightMode>
          <Text>test</Text>
          <Button>test</Button>
        </LightMode>

        <DarkMode>
          <Text>test</Text>
          <Button>test</Button>
        </DarkMode>

         <div data-theme="dark">
          <Text>dark theme test</Text>
          <Button>dark theme test</Button>
        </div>

        <Box background="black" data-theme="dark">
          <Text>zzz</Text>
        </Box>

        <LightMode>
          <Text>test</Text>
        </LightMode>
        <DarkMode><Box background="#333">
          <Text>test</Text>
        </Box></DarkMode>

        <ColorModeProvider value="light">
          <Text>test</Text>
        </ColorModeProvider>
        <ColorModeProvider value="dark"><Box background="#333">
          <Text>test</Text>
        </Box></ColorModeProvider>*/}

        <Grid gap="2rem" templateColumns={["1fr 1fr", "1fr 1fr", "4fr 3fr 3fr 2fr"]}>
          <div>
            <Heading as="h4" size="xs" marginBottom="1rem" lineHeight="calc(1.2 * 20px)">
              &copy; Paqmind, 2022
            </Heading>
            <List spacing=".75rem">
              <ListItem>
                <Link href="/terms-of-use" asText>
                  Terms of Use
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://github.com/ivan-kleshnin/paqmind-chakra-contentlayer" asText>
                  <BrandGithub strokeWidth={1} style={{display: "block"}}/>
                </Link>
              </ListItem>
              {/*<ListItem>Privacy policy</ListItem>*/}
              {/*<ListItem>Offer</ListItem>*/}
              {/*<ListItem><a href="/links">Thank you</a></ListItem>*/}
            </List>
          </div>
          <div>
            <GroupHeading>LEARNING</GroupHeading>
            <List spacing=".75rem">
              <ListItem>WIP</ListItem>
              {/*<ListItem>Mentors</ListItem>*/}
              {/*<ListItem>Tutorials</ListItem>*/}
              <ListItem>
                <Link href="/links" asText>Useful Links</Link>
              </ListItem>
            </List>
          </div>
          <div>
            <GroupHeading>PROJECT</GroupHeading>
            <List spacing=".75rem">
              <ListItem>
                <Link href="/about" asText>About</Link>
              </ListItem>
              <ListItem>
                <Link href="/blog" asText>Blog</Link>
              </ListItem>
              <ListItem>
                <Link href="/testimonials" asText>Testimonials</Link>
              </ListItem>
              {/*<ListItem>Feedback</ListItem>*/}
            </List>
          </div>
          <div>
            <GroupHeading>COMMUNITY</GroupHeading>
            <List spacing=".75rem">
              <ListItem>
                <BrandYoutube strokeWidth={1} style={{display: "block"}}/>
              </ListItem>
              <ListItem>
                <BrandTelegram strokeWidth={1} style={{display: "block"}}/>
              </ListItem>
              <ListItem>
                <BrandLinkedin strokeWidth={1} style={{display: "block"}}/>
              </ListItem>
            </List>
          </div>
        </Grid>
      </WidthHolder>
    </Box>
  </>
}

// GroupHeading
function GroupHeading({children}: {children: string}): JSX.Element {
  const theme = useTheme()

  return <>
    <Heading as="h4" size="sm" marginBottom="1rem" sx={{
      fontVariant: "small-caps",
      letterSpacing: `calc(${theme.letterSpacings.wide} / 2)`,
    }}>
      {children.toLowerCase()}
    </Heading>
  </>
}
