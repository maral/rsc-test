import classNames from 'classnames'
import * as React from 'react'
import { Repeater, RichText, types } from 'react-bricks/rsc'
import {
  backgroundWithImageBgSideGroup,
  highlightTextEditProps,
  LayoutProps,
  paddingBordersSideGroup,
  sectionDefaults,
  textGradientEditProps,
} from '../../LayoutSideProps'
import blockNames from '../../blockNames'
import {
  bgColors,
  buttonColors,
  gradients,
  highlightTextColors,
  textColors,
} from '../../colors'
import Container from '../../shared/components/Container'
import Section from '../../shared/components/Section'
import { ButtonProps } from '../../shared/bricks/Button'

export interface HeroUnitProps extends LayoutProps {
  textGradient: keyof typeof gradients
  highlightTextColor: { color: string; className: string }
  title: types.TextValue
  text: types.TextValue
  buttons: types.RepeaterItems
  badge: types.RepeaterItems
  joke: string
  jokeCategory: keyof typeof categories
}

const HeroUnit2: types.Brick<HeroUnitProps> = ({
  backgroundColor,
  backgroundImage,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  textGradient,
  highlightTextColor,
  title,
  text,
  buttons,
  badge,
  joke,
}: HeroUnitProps) => {
  const titleColor = textColors.GRAY_800
  const textColor = textColors.GRAY_700
  const titleStyle =
    textGradient !== gradients.NONE.value
      ? { WebkitTextFillColor: 'transparent' }
      : {}

  console.log('am I a client component?')

  return (
    <Section
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      borderTop={borderTop}
      borderBottom={borderBottom}
    >
      <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <div className="flex flex-col lg:flex-row items-start space-y-2 lg:space-x-14 lg:space-y-0">
          <div className="flex-1">
            <div className="lg:flex">
              <Repeater
                propName="badge"
                items={badge}
                itemProps={{ textAlign: 'left' }}
                renderWrapper={(items) => <div className="mb-4">{items}</div>}
              />
            </div>

            <div
              className={classNames(
                titleColor,
                gradients[textGradient]?.className
              )}
              style={titleStyle}
            >
              <RichText
                propName="title"
                value={title}
                renderBlock={(props) => {
                  console.log('renderBlock here')
                  return (
                    <h1
                      className={classNames(
                        'text-[28px] leading-8 sm:text-[40px] sm:leading-tight lg:text-[44px] lg:leading-snug text-center lg:text-left font-extrabold mb-4 bg-clip-text bg-gradient-to-r   ',
                        titleColor
                      )}
                      {...props.attributes}
                    >
                      {props.children}
                    </h1>
                  )
                }}
                allowedFeatures={[
                  types.RichTextFeatures.Highlight,
                  types.RichTextFeatures.Bold,
                  types.RichTextFeatures.Heading1,
                  types.RichTextFeatures.OrderedList,
                ]}
                placeholder="Type a title..."
                renderHighlight={({ children }) => (
                  <span className={highlightTextColor.className}>
                    {children}
                  </span>
                )}
                renderLI={({ children }) => (
                  <li className="text-xl">{children}</li>
                )}
                renderOL={({ children }) => (
                  <ol className="list-decimal list-inside">{children}</ol>
                )}
                renderBold={({ children }) => (
                  <span style={{ textDecoration: 'underline' }}>
                    {children}
                  </span>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <RichText
              propName="text"
              value={text}
              renderBlock={(props) => (
                <p
                  className={classNames(
                    'text-center lg:text-left text-base leading-6 sm:text-xl sm:leading-8',
                    textColor
                  )}
                  {...props.attributes}
                >
                  {props.children}
                </p>
              )}
              placeholder="Type a text..."
              allowedFeatures={[types.RichTextFeatures.Bold]}
            />
            <p className="text-pink-400 text-center mt-4">{joke}</p>
            <Repeater
              propName="buttons"
              items={buttons}
              renderWrapper={(items) => (
                <div className="flex flex-row space-x-5 items-center justify-center lg:justify-start mt-6">
                  {items}
                </div>
              )}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

type JokeCategory = {
  label: string
  value: string
}

const categories = {
  any: { label: 'Any', value: 'any' },
  animal: { label: 'Animal', value: 'animal' },
  career: { label: 'Career', value: 'career' },
  celebrity: { label: 'Celebrity', value: 'celebrity' },
  dev: { label: 'Dev', value: 'dev' },
  explicit: { label: 'Explicit', value: 'explicit' },
  fashion: { label: 'Fashion', value: 'fashion' },
  food: { label: 'Food', value: 'food' },
  history: { label: 'History', value: 'history' },
  money: { label: 'Money', value: 'money' },
  movie: { label: 'Movie', value: 'movie' },
  music: { label: 'Music', value: 'music' },
  political: { label: 'Political', value: 'political' },
  religion: { label: 'Religion', value: 'religion' },
  science: { label: 'Science', value: 'science' },
  sport: { label: 'Sport', value: 'sport' },
  travel: { label: 'Travel', value: 'travel' },
} as const satisfies Record<string, JokeCategory>

HeroUnit2.schema = {
  name: blockNames.HeroUnit2,
  label: 'Horizontal Hero',
  category: 'hero sections',
  tags: ['hero unit', 'horizontal hero', 'title'],
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Hero%20Unit/HeroUnit.tsx',
  previewImageUrl: `/bricks-preview-images/${blockNames.HeroUnit2}.png`,
  getExternalData: async (page, props) => {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/random${
        props &&
        props.jokeCategory !== 'any' &&
        props.jokeCategory !== undefined
          ? `?category=${props.jokeCategory.toLowerCase()}`
          : ''
      }`,
      { cache: 'no-store' }
    )
    if (!response.ok) {
      console.log(`An error has occurred: ${response.status}`)
      return { joke: 'No joke!' }
    } else {
      return { joke: (await response.json()).value }
    }
  },
  getDefaultProps: () => ({
    ...sectionDefaults,
    paddingTop: '20',
    paddingBottom: '16',
    textGradient: gradients.NONE.value,
    highlightTextColor: highlightTextColors.PINK.value,
    title: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'We develop ',
          },
          {
            text: 'beautiful',
            highlight: true,
          },
          {
            text: ' web applications',
          },
        ],
      },
    ],
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
    buttons: [
      {
        type: 'link',
        text: 'Get Started now',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: buttonColors.SKY.value,
        variant: 'solid',
        padding: 'normal',
        simpleAnchorLink: false,
      },
      {
        type: 'link',
        text: 'Watch demo',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: buttonColors.SKY.value,
        variant: 'outline',
        padding: 'normal',
        simpleAnchorLink: false,
      },
    ],
    jokeCategory: 'any',
    joke: "No joke!",
  }),
  repeaterItems: [
    {
      name: 'badge',
      itemType: blockNames.Badge,
      itemLabel: 'Badge',
      min: 0,
      max: 1,
    },
    {
      name: 'buttons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
  ],
  sideEditProps: [
    {
      groupName: 'Title',
      defaultOpen: true,
      props: [
        textGradientEditProps,
        highlightTextEditProps,
        {
          name: 'jokeCategory',
          label: 'Joke category',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Select,
            options: Object.values(categories),
          },
          shouldRefreshText: true,
          shouldRefreshStyles: true,
        },
      ],
    },
    backgroundWithImageBgSideGroup,
    paddingBordersSideGroup,
  ],
  stories: [
    {
      id: 'horizontal-hero-dark',
      name: 'Horizontal Hero Dark',
      showAsBrick: true,
      previewImageUrl: `/bricks-preview-images/horizontal-hero-dark.png`,
      props: {
        ...sectionDefaults,
        paddingTop: '20',
        paddingBottom: '16',
        backgroundColor: bgColors.DARK_GRAY.value,
        textGradient: gradients.NONE.value,
        highlightTextColor: highlightTextColors.LIME.value,
        title: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Great ',
              },
              {
                text: 'DX',
                highlight: true,
              },
              {
                text: ' for Developers, great ',
              },
              {
                text: 'UX',
                highlight: true,
              },
              {
                text: ' for Content editors.',
              },
            ],
          },
        ],
        text: "Forget grey fields, welcome visual editing. Forget going back and forth between the CMS and your editor: it's just React. Enterprise-ready.",
        buttons: [
          {
            type: 'link',
            text: 'Tutorial',
            href: 'https://reactbricks.com/learn',
            isTargetBlank: true,
            buttonType: 'submit',
            buttonColor: buttonColors.SKY.value,
            variant: 'solid',
            padding: 'normal',
            simpleAnchorLink: false,
          },
          {
            type: 'link',
            text: 'View the Docs',
            href: 'https://docs.reactbricks.com/',
            isTargetBlank: true,
            buttonType: 'submit',
            buttonColor: buttonColors.SKY.value,
            variant: 'outline',
            padding: 'normal',
            simpleAnchorLink: false,
          },
        ],
      },
    },
  ],
}

export default HeroUnit2
