import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

import type { TNewPostEmailSchema } from "~/schemas/email/new-post.schema";

import { EURLS, appDescription, appTitle, appURL } from "~/settings/constants";

export const newPost = ({ title, body, fileUnder }: TNewPostEmailSchema) => (
  <Html lang="en" dir="ltr">
    <Container>
      <Heading as="h1">New Post {appTitle}</Heading>
      <Text>{appDescription}</Text>
      <Heading as="h2">
        Post title: <Text>{title}</Text>
      </Heading>
      <Hr />
      <Heading as="h3">
        Post category: <Text>{fileUnder}</Text>
      </Heading>
      <Heading as="h3">Post body:</Heading>
      <Text>{body}</Text>
      <Hr />
      <Button
        href={`${appURL}${EURLS.PostPending}`}
        style={{
          padding: "5px 10px",
          fontSize: "1.25rem",
          backgroundColor: "#00000",
          color: "#fffff",
        }}
      >
        View pending posts
      </Button>
      <Hr />
    </Container>
  </Html>
);
