import {FC} from "react";
import Link from "next/link";

interface IProps {
	url: string;
	label: string;
	tailwindStyling: string;
}

const FooterMenuLinks: FC<IProps> = ({url, label, tailwindStyling}) => {
	return (
		<Link className={tailwindStyling} href={url}>
			{label}
		</Link>
	);
};

export default FooterMenuLinks;