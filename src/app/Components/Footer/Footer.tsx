import styled, { css } from "styled-components";
import Image from "next/image";


const DesktopSocialList = styled.div`
display: flex;
padding: 20px;
justify-content: center;
bottom: 0;
width: 100%;
`;

export default function Footer() {
  return (
    <DesktopSocialList>
      <Image
        src="/Lexicon.png"
        alt="Next.js Logo"
        width={24}
        height={24}
        className="justify-self-end mx-2"
        priority
      />
      <Image
        src="/Arbitrium.png"
        alt="Next.js Logo"
        width={24}
        height={24}
        className="justify-self-end mx-2"
        priority
      />
      <Image
        src="/Plurality.png"
        alt="Next.js Logo"
        width={24}
        height={24}
        className="justify-self-end mx-2"
        priority
      />
    </DesktopSocialList>
  );
}
