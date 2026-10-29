import Svg, { Path, Ellipse } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

export default function DryFoodIcon({ size = 24, color = "#a0a0b0" }: Props) {
	return (
		<Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
			<Path
				d="M17 9h30l-2 9 6 11v24c0 3-2 4-5 4H18c-3 0-5-1-5-4V29l6-11-2-9Z"
				stroke={color}
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M17 9c0 4 6 6 15 6s15-2 15-6"
				stroke={color}
				strokeWidth={2.5}
				strokeLinecap="round"
			/>
			<Path
				d="M19 24h26"
				stroke={color}
				strokeWidth={2.5}
				strokeLinecap="round"
			/>
			<Path
				d="M32 43c-2-3-7-5-9-1-2 4 2 8 9 11 7-3 11-7 9-11-2-4-7-2-9 1Z"
				stroke={color}
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Ellipse
				cx="24"
				cy="36"
				rx="2.5"
				ry="3"
				stroke={color}
				strokeWidth={2}
			/>
			<Ellipse
				cx="31"
				cy="33.5"
				rx="2.5"
				ry="3"
				stroke={color}
				strokeWidth={2}
			/>
			<Ellipse
				cx="38"
				cy="36"
				rx="2.5"
				ry="3"
				stroke={color}
				strokeWidth={2}
			/>
		</Svg>
	);
}
