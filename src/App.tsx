import { VariantProps, cva } from "class-variance-authority";
import { createElement, useState } from "react";

const htmlElementStyles = cva(
  [
    "outline-none after:text-gray-400 after:opacity-0 after:content-['placeholder'] empty:after:opacity-100",
  ],
  {
    variants: {
      variant: {
        h1: "text-4xl font-bold",
        h2: "text-3xl font-bold",
        h3: "text-2xl font-bold",
        h4: "text-xl font-bold",
        h5: "text-lg font-bold",
        p: "text-base",
      },
    },
  },
);

type THtmlVariant = NonNullable<
  VariantProps<typeof htmlElementStyles>["variant"]
>;

const variantToHtmlElementMap: Record<THtmlVariant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  p: "p",
};

type TBlock = {
  variant: THtmlVariant;
  content: string;
};

type TBlockProps = TBlock & {
  onKeyDown: (e: React.KeyboardEvent<Element>) => void;
};

const Block = ({ variant, content, onKeyDown }: TBlockProps) => {
  return createElement(
    variantToHtmlElementMap[variant],
    {
      onKeyDown,
      contentEditable: true,
      className: htmlElementStyles({ variant }),
    },
    content,
  );
};

const initialBlock: TBlock = {
  variant: "p",
  content: "",
};

export const App = () => {
  const [blocks, setBlocks] = useState<Array<TBlock>>([initialBlock]);

  const handleKeyDown = (e: React.KeyboardEvent<Element>) => {
    const key = e.key;

    switch (key) {
      case "Enter": {
        e.preventDefault();
        setBlocks((prev) => [...prev, initialBlock]);

        setTimeout(() => {
          const lastBlock = document.querySelector("p:last-child");
          (lastBlock as HTMLElement)?.focus();
        }, 0);
        break;
      }
    }
  };

  return (
    <main className="p-8">
      {blocks.map((block, i) => (
        <Block
          key={i}
          variant={block.variant}
          content={block.content}
          onKeyDown={handleKeyDown}
        />
      ))}
    </main>
  );
};
