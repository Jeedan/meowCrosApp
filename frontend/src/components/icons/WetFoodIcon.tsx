import Svg, { Ellipse, Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

export default function WetFoodIcon({ size = 24, color = "#a0a0b0" }: Props) {
	return (
		<Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
			{/* Open lid */}
			<Ellipse
				cx="32"
				cy="10"
				rx="24"
				ry="7"
				stroke={color}
				strokeWidth="2.5"
			/>

			{/* Can rim and opening */}
			<Path
				d="M8 29V51C8 57 18.7 61 32 61S56 57 56 51V29"
				stroke={color}
				strokeWidth="2.5"
				strokeLinejoin="round"
			/>
			<Ellipse
				cx="32"
				cy="29"
				rx="24"
				ry="8"
				stroke={color}
				strokeWidth="2.5"
			/>

			{/* Food surface */}
			{/* <Path
				d="M10 29C10 25 19.8 21 32 21S54 25 54 29"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
			<Path
				d="M16 29C18 25 20 27 22 28S26 25 29 27S33 29 36 27S41 26 43 28S47 26 49 29"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/> */}

			{/* Cat head emblem */}
			<Path
				d="M22 39L25 44L32 42L39 44L42 39L44 48C44 54 39 57 32 57S20 54 20 48L22 39Z"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M27 49C28.5 51 30 52 32 52S35.5 51 37 49"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
		</Svg>
	);
}
