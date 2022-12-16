import { Button, Stack, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { FloatingLabelInput } from "~/components/FloatingLabelInput";

export default function Index() {
  const [isShortened, setIsShortened] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Stack align="center" mt={50}>
      <Text size="xl" weight={500}>
        Welcome to my URL shortner
      </Text>
      <FloatingLabelInput value={value} setValue={setValue} />
      <Button onClick={() => setIsShortened(!(value == ""))}>Submit</Button>
      <Text hidden={!isShortened}>
        Shortened URL
        <Link to={value}>{value}</Link>
      </Text>
    </Stack>
  );
}
