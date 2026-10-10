extends Control

const LEVELS_PATH := "res://data/levels.json"
const BACKGROUND := Color("#101827")
const TEXT := Color("#f0eadf")
const ACCENT := Color("#f0ba62")
const MUTED := Color("#aab6c7")

var rounds: Array = []
var current_round: int = 0
var points: int = 0
var solved: bool = false
var grid: GridContainer
var intro: Label
var progress: Label
var feedback: Label
var next_button: Button
var answer_buttons: Array[Button] = []


func _ready() -> void:
    var file := FileAccess.open(LEVELS_PATH, FileAccess.READ)
    if file == null:
        push_error("Missing offline level manifest")
        return
    var parsed: Variant = JSON.parse_string(file.get_as_text())
    if typeof(parsed) != TYPE_DICTIONARY or not parsed.has("levels"):
        push_error("Invalid offline level manifest")
        return
    rounds = parsed["levels"]
    _make_layout()
    _show_round()


func _make_layout() -> void:
    var bg := ColorRect.new()
    bg.color = BACKGROUND
    bg.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(bg)
    var outer := MarginContainer.new()
    outer.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    outer.add_theme_constant_override("margin_left", 20)
    outer.add_theme_constant_override("margin_right", 20)
    outer.add_theme_constant_override("margin_top", 26)
    outer.add_theme_constant_override("margin_bottom", 18)
    add_child(outer)
    var col := VBoxContainer.new()
    col.add_theme_constant_override("separation", 14)
    outer.add_child(col)
    var title := Label.new()
    title.text = "ARCHIVE HEIST"
    title.add_theme_font_size_override("font_size", 34)
    title.add_theme_color_override("font_color", ACCENT)
    col.add_child(title)
    progress = Label.new()
    progress.add_theme_color_override("font_color", MUTED)
    col.add_child(progress)
    intro = Label.new()
    intro.text = "Jedna z czterech tabliczek ma sfałszowaną datę. Sprawdź, która przeczy okresowi z katalogu muzeum."
    intro.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    intro.add_theme_font_size_override("font_size", 18)
    intro.add_theme_color_override("font_color", TEXT)
    col.add_child(intro)
    var scroll := ScrollContainer.new()
    scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
    scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
    col.add_child(scroll)
    grid = GridContainer.new()
    grid.columns = 2
    grid.add_theme_constant_override("h_separation", 12)
    grid.add_theme_constant_override("v_separation", 12)
    grid.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    scroll.add_child(grid)
    feedback = Label.new()
    feedback.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    feedback.custom_minimum_size = Vector2(0, 75)
    feedback.add_theme_color_override("font_color", ACCENT)
    col.add_child(feedback)
    next_button = Button.new()
    next_button.text = "Następna sprawa →"
    next_button.custom_minimum_size = Vector2(0, 58)
    next_button.pressed.connect(_next)
    col.add_child(next_button)


func _show_round() -> void:
    solved = false
    answer_buttons.clear()
    for child in grid.get_children():
        grid.remove_child(child)
        child.queue_free()
    if current_round >= rounds.size():
        progress.text = "WYNIK  %d / %d" % [points, rounds.size()]
        intro.text = "Archiwum odzyskane. Wszystkie sprawy zostały rozpatrzone."
        feedback.text = "To fikcyjne zagadki bazujące na rzeczywistych dziełach The Met."
        next_button.text = "Zagraj ponownie"
        next_button.show()
        return
    var case: Dictionary = rounds[current_round]
    progress.text = "SPRAWA %02d / %02d  •  PUNKTY %d" % [current_round + 1, rounds.size(), points]
    intro.text = "Która data na tabliczce jest niezgodna z okresem opisanym w katalogu? Wybierz jeden eksponat."
    feedback.text = "Wskazówka: w p.n.e. wieki liczymy wstecz. Pozostałe trzy opisy są zgodne."
    next_button.hide()
    for candidate in case["cards"]:
        _add_card(candidate)


func _add_card(card: Dictionary) -> void:
    var panel := PanelContainer.new()
    panel.custom_minimum_size = Vector2(295, 300)
    panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    grid.add_child(panel)
    var col := VBoxContainer.new()
    col.add_theme_constant_override("separation", 6)
    panel.add_child(col)
    var pic := TextureRect.new()
    pic.custom_minimum_size = Vector2(230, 145)
    pic.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
    pic.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
    pic.mouse_filter = Control.MOUSE_FILTER_IGNORE
    pic.texture = load(String(card["image"]))
    col.add_child(pic)
    var name_label := Label.new()
    name_label.text = String(card["title"]).substr(0, 35)
    name_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    name_label.add_theme_color_override("font_color", TEXT)
    name_label.add_theme_font_size_override("font_size", 15)
    col.add_child(name_label)
    var period_label := Label.new()
    period_label.text = "OKRES: " + String(card["period"])
    period_label.add_theme_color_override("font_color", MUTED)
    col.add_child(period_label)
    var year_label := Label.new()
    year_label.text = "TABLICZKA: %d" % int(card["display_year"])
    year_label.add_theme_color_override("font_color", ACCENT)
    col.add_child(year_label)
    var button := Button.new()
    button.text = "SPRAWDŹ TEN OBIEKT"
    button.custom_minimum_size = Vector2(0, 45)
    button.pressed.connect(_choose.bind(card))
    col.add_child(button)
    answer_buttons.append(button)


func _choose(card: Dictionary) -> void:
    if solved:
        return
    solved = true
    for button in answer_buttons:
        button.disabled = true
    var ok: bool = card["is_forged"]
    if ok:
        points += 1
        feedback.text = "TRAFNIE! Data na tabliczce nie zgadza się z okresem archiwalnym."
    else:
        var case: Dictionary = rounds[current_round]
        for candidate in case["cards"]:
            if candidate["is_forged"]:
                card = candidate
                break
        feedback.text = "To nie ta karta. Fałszywa data jest przy obiekcie nr %s." % str(card["object_id"])
    feedback.text += "  Katalog: %d.  Rekord The Met: %s" % [int(card["catalog_year"]), str(card["object_id"])]
    next_button.show()


func _next() -> void:
    if current_round >= rounds.size():
        current_round = 0
        points = 0
    else:
        current_round += 1
    _show_round()
