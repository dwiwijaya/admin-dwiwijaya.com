import { BackButton } from "@/components/common/BackButton";
import PageHeading from "@/components/common/PageHeading";
import Container from "@/components/layout/Container";
import CreateBlog from "@/components/views/blog/create";
import Link from "next/link";
import React from "react";

const create = () => {
  return (
    <Container>
      <PageHeading title="Create Blog" />
      <CreateBlog />
    </Container>
  );
};

export default create;