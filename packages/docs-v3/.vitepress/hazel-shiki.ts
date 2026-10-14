import type { ThemeRegistration } from 'shiki';

// Syntax themes built from the Hazel base palette
// (https://hazel.a16n.dev/tokens). Hazel doesn't define syntax tokens, so
// this uses the Monokai Pro-style mapping its palette is derived from.
interface Palette {
  bg: string;
  text: string;
  comment: string;
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
}

const dark: Palette = {
  bg: '#1d1718',
  text: '#fff0f4',
  comment: '#73696b',
  red: '#fd6883',
  orange: '#f38d70',
  yellow: '#f9cc6c',
  green: '#adda78',
  blue: '#85dacc',
  purple: '#a8a9eb',
};

const light: Palette = {
  bg: '#fef8f9',
  text: '#2e2325',
  comment: '#94898b',
  red: '#d04a69',
  orange: '#d06247',
  yellow: '#d99507',
  green: '#5c993a',
  blue: '#309592',
  purple: '#6e6bd1',
};

function theme(name: string, type: 'light' | 'dark', c: Palette): ThemeRegistration {
  return {
    name,
    type,
    colors: { 'editor.background': c.bg, 'editor.foreground': c.text },
    tokenColors: [
      { settings: { foreground: c.text } },
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
      { scope: ['string', 'string.template', 'markup.inline.raw'], settings: { foreground: c.yellow } },
      { scope: ['constant.character.escape', 'string.regexp'], settings: { foreground: c.blue } },
      { scope: ['constant.numeric', 'constant.language', 'constant.other', 'support.constant'], settings: { foreground: c.purple } },
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.operator.expression', 'variable.language.this'],
        settings: { foreground: c.red },
      },
      { scope: ['keyword.operator', 'punctuation.separator', 'punctuation.terminator'], settings: { foreground: c.comment } },
      { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: c.green } },
      {
        scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class', 'meta.type.annotation entity.name.type'],
        settings: { foreground: c.blue, fontStyle: 'italic' },
      },
      { scope: ['variable.parameter', 'meta.parameter'], settings: { foreground: c.orange, fontStyle: 'italic' } },
      { scope: ['variable.other.property', 'support.variable.property', 'meta.object-literal.key'], settings: { foreground: c.text } },
      { scope: ['entity.name.tag'], settings: { foreground: c.red } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: c.blue, fontStyle: 'italic' } },
      { scope: ['support.type.property-name.json', 'support.type.property-name'], settings: { foreground: c.blue } },
      { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: c.green, fontStyle: 'bold' } },
      { scope: ['markup.inserted'], settings: { foreground: c.green } },
      { scope: ['markup.deleted'], settings: { foreground: c.red } },
      { scope: ['markup.changed'], settings: { foreground: c.orange } },
      { scope: ['variable.other.env', 'variable.other.normal.shell'], settings: { foreground: c.orange } },
    ],
  };
}

export const hazelDark = theme('hazel-dark', 'dark', dark);
export const hazelLight = theme('hazel-light', 'light', light);
