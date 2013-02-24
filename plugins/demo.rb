# Demo tag for quickly including demos on blog posts.
# Author: TJ VanToll
#
# Syntax: {% demo href title [height] %}
#
# At the moment the title needs to be underscore delimiter because of limitations
# of my reg ex abilities to pull a space delimited title out.
#
# Usage: {% demo /demo/2013-01-01/foo.html An_Example_of_Foo 300 %}

module Jekyll
  class DemoTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      if /(?<url>[\w.\-(\/)*]+)(?:\s(?<title>\w+))(?:\s(?<height>\d+))?/ =~ markup
        @url    = url
        @title  = title.gsub('_', ' ')
        @height = height || '300'
      end
      super
    end

    def render(context)
      #wondering what this syntax is? google "here document"
      #http://stackoverflow.com/questions/14949298/octopress-html-includes-with-arguments
      "<div class=\"code_example\"><h6>#{@title}<a href=\"#{@url}\" target=\"_blank\">Open in New Window</a></h6><iframe style=\"width: 100%; height: #{@height}px;\" frameborder=\"0\" src=\"#{@url}\"></iframe></div>"
    end
  end
end

Liquid::Template.register_tag('demo', Jekyll::DemoTag)