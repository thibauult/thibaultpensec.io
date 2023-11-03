import {Bounded} from "@/components/Bounded";
import {PrismicNextLink, PrismicNextImage} from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.IconListSlice} IconListSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconListSlice>} IconListProps
 * @param {IconListProps}
 */
const IconList = ({ slice }) => {
  return (
      <Bounded as="section" className="bg-white">

        <ul className="flex flex-row place-content-center gap-8">
          {slice.items.map((item) => (
              <li key={item.link.url}>
                  <PrismicNextLink field={item.link}>
                      <PrismicNextImage className="rounded" field={item.icon} />
                  </PrismicNextLink>
              </li>
          ))}
        </ul>

      </Bounded>
  );
};

export default IconList;
