import { Button, Stack, Text } from "@mantine/core";
import { ActionArgs } from "@remix-run/cloudflare";
import { Form, Link, useActionData } from "@remix-run/react";
import React, { useState } from "react";
import { FloatingLabelInput } from "~/components/FloatingLabelInput";

export async function action({request}: ActionArgs) {
  // https://developers.cloudflare.com/pages/platform/functions/bindings/#d1-databases
  // https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/
  // This executes on server, convert a form's PUT request to sending values to the Database.
  // Maybe convert to HASH and send HASH:URL as Key Value pair to the Database
  // Then, return KEY or set a KEY variable
  // And add Link, url.viranchee.com/KEY
}

export default function Index() {
  const [isShortened, setIsShortened] = useState(false);
  const [value, setValue] = useState("");
  const actionData = useActionData<typeof action>();

  return (
    <Stack align="center" mt={50}>
      <Text size="xl" weight={500}>
        Welcome to my URL shortner
      </Text>
      <Form>
        {/* TODO: https://remix.run/docs/en/v1/components/form */}
      </Form>
      <FloatingLabelInput value={value} setValue={setValue} />
      <Button onClick={() => setIsShortened(!(value == ""))}>Submit</Button>
      <Text hidden={!isShortened}>
        Shortened URL
        <Link to={value}>{value}</Link>
      </Text>
    </Stack>
  );
}
