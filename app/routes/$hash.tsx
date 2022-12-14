import { useParams } from "@remix-run/react";
import type {
  LoaderFunction,
  ActionFunction,
} from "@remix-run/cloudflare"; // or cloudflare/deno

export const loader: LoaderFunction = async ({
  params,
}) => {
  console.log(params.postId);
};

export const action: ActionFunction = async ({
  params,
}) => {
  console.log(params.postId);
};

export default function PostRoute() {
  const params = useParams();
  // console.log(params.postId);
}