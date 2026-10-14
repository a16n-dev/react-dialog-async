import type { ThemeRegistration } from 'shiki';

// Syntax themes built from the Hazel base palette
// (https://hazel.a16n.dev/tokens). Hazel doesn't define syntax tokens, so
// tokens are coloured the way Monokai Pro (Filter Ristretto) colours them in
// JetBrains IDEs, which is the scheme Hazel's palette is derived from.
interface Palette {
  bg: string;
  text: string;
  /** `this`/`super` — Monokai Pro's muted grey. */
  muted: string;
  /** Brackets, commas, dots, semicolons and tag delimiters. */
  punctuation: string;
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
  muted: '#c4b6b9',
  punctuation: '#8d8385',
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
  muted: '#5a4f51',
  punctuation: '#796e70',
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

      // Comments
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment, fontStyle: 'italic' } },
      { scope: ['comment.block.documentation storage.type.class', 'comment.block.documentation keyword'], settings: { foreground: c.purple, fontStyle: 'italic' } },
      { scope: ['comment.block.documentation variable', 'comment.block.documentation entity.name.type'], settings: { foreground: c.punctuation, fontStyle: 'italic' } },

      // Strings
      { scope: ['string', 'string.template', 'markup.inline.raw', 'string.regexp'], settings: { foreground: c.yellow } },
      { scope: ['constant.character.escape'], settings: { foreground: c.blue } },
      { scope: ['punctuation.definition.template-expression'], settings: { foreground: c.red } },
      { scope: ['meta.template.expression'], settings: { foreground: c.text } },

      // Numbers, null/undefined/booleans and other constants
      { scope: ['constant.numeric', 'constant.language', 'support.constant.json'], settings: { foreground: c.purple } },
      { scope: ['constant.other', 'support.constant', 'variable.other.enummember'], settings: { foreground: c.orange } },

      // Keywords and operators
      {
        scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator', 'keyword.operator.new', 'keyword.operator.expression'],
        settings: { foreground: c.red },
      },
      { scope: ['variable.language.this', 'variable.language.super'], settings: { foreground: c.muted, fontStyle: 'italic' } },

      // Punctuation
      {
        scope: [
          'punctuation',
          'meta.brace',
          'punctuation.separator',
          'punctuation.terminator',
          'punctuation.accessor',
          'punctuation.definition.block',
          'punctuation.definition.parameters',
          'punctuation.definition.typeparameters',
          'punctuation.definition.tag',
          'punctuation.section.embedded',
          'keyword.operator.type.annotation',
        ],
        settings: { foreground: c.punctuation, fontStyle: '' },
      },
      { scope: ['punctuation.definition.string'], settings: { foreground: c.yellow } },

      // Functions
      { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: c.green } },

      // Types: declarations green, references blue, interfaces italic
      { scope: ['entity.name.type.class', 'entity.name.class'], settings: { foreground: c.green } },
      {
        scope: ['entity.name.type', 'support.type', 'support.class', 'entity.other.inherited-class', 'meta.type.annotation entity.name.type'],
        settings: { foreground: c.blue },
      },
      { scope: ['entity.name.type.interface', 'entity.name.type.alias'], settings: { foreground: c.blue, fontStyle: 'italic' } },
      { scope: ['meta.type.parameters entity.name.type', 'entity.name.type.parameter'], settings: { foreground: c.yellow } },
      { scope: ['support.type.primitive', 'support.type.builtin'], settings: { foreground: c.blue, fontStyle: 'italic' } },

      // Variables and parameters
      { scope: ['variable.parameter', 'meta.parameter'], settings: { foreground: c.orange, fontStyle: 'italic' } },
      { scope: ['variable.other.property', 'support.variable.property', 'meta.object-literal.key'], settings: { foreground: c.text } },

      // JSX / HTML
      { scope: ['entity.name.tag', 'support.class.component'], settings: { foreground: c.red } },
      { scope: ['entity.other.attribute-name'], settings: { foreground: c.blue, fontStyle: 'italic' } },

      // JSON
      { scope: ['support.type.property-name.json', 'support.type.property-name'], settings: { foreground: c.text } },

      // Markup and shell
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
