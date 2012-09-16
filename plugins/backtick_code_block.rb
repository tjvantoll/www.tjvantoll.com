require './plugins/pygments_code'

module BacktickCodeBlock
  include HighlightCode
  AllOptions = /([^\s]+)\s+(.+?)(https?:\/\/\S+)\s*(.+)?/i
  LangCaption = /([^\s]+)\s*(.+)?/i
  def render_code_block(input)
    @options = nil
    @caption = nil
    @lang = nil
    @url = nil
    @title = nil
    input.gsub(/^`{3} *([^\n]+)?\n(.+?)\n`{3}/m) do
      @options = $1 || ''
      str = $2

      if @options =~ AllOptions
        @lang = $1
        #Custom adding of the empty / not_empty classes for styling.
        if $2.to_s == ""
          @caption = "<figcaption class='empty'><span>#{$2}</span><a href='#{$3}'>#{$4 || 'link'}</a></figcaption>"
        else
          @caption = "<figcaption class='not_empty'><span>#{$2}</span><a href='#{$3}'>#{$4 || 'link'}</a></figcaption>"
        end
      elsif @options =~ LangCaption
        @lang = $1
        #Custom adding of the empty / not_empty classes for styling.
        if $2.to_s == ""
          @caption = "<figcaption class='empty'><span>#{$2}</span></figcaption>"
        else
          @caption = "<figcaption class='not_empty'><span>#{$2}</span></figcaption>"
        end
      end

      if str.match(/\A( {4}|\t)/)
        str = str.gsub(/^( {4}|\t)/, '')
      end
      if @lang.nil? || @lang == 'plain'
        code = tableize_code(str.gsub('<','&lt;').gsub('>','&gt;'))
        "<figure class='code'>#{@caption}#{code}</figure>"
      else
        if @lang.include? "-raw"
          raw = "``` #{@options.sub('-raw', '')}\n"
          raw += str
          raw += "\n```\n"
        else
          code = highlight(str, @lang)
          "<figure class='code'>#{@caption}#{code}</figure>"
        end
      end
    end
  end
end
