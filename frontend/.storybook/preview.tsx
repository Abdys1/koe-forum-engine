import "@/styles/global-styles.css";
import "material-icons/iconfont/material-icons.css";

import type { Preview } from "@storybook/nextjs-vite";

import { caveat, cinzel, cinzelDecorative, mrsSaintDelafield, pirataOne, poppins, roboto, splash, sumana } from "@/app/fonts";
import { colors, fonts } from "@/styles/tokens";

const fontVariables = [roboto, poppins, sumana, caveat, mrsSaintDelafield, splash, pirataOne, cinzel, cinzelDecorative]
    .map(font => font.variable)
    .join(" ");

const preview: Preview = {
    parameters: {
        layout: "centered",
        nextjs: { appDirectory: true },
        backgrounds: {
            options: {
                page: { name: "Oldal", value: colors.pageDarkBg },
                card: { name: "Kártya", value: colors.cardBlackBg },
                light: { name: "Világos", value: colors.white },
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: "page" },
    },
    decorators: [
        Story => (
            <div className={fontVariables} style={{ fontFamily: fonts.roboto }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
