extends SceneTree

func _initialize() -> void:
    call_deferred("_test")


func _fail(message: String) -> void:
    push_error("ARCHIVE_TEST FAIL: " + message)
    quit(1)


func _test() -> void:
    var scene: PackedScene = load("res://main.tscn")
    var game: Control = scene.instantiate()
    root.add_child(game)
    await process_frame
    if game.rounds.size() != 8:
        _fail("expected 8 levels")
        return
    if game.answer_buttons.size() != 4:
        _fail("expected 4 answer buttons")
        return
    for n in range(8):
        var round_data: Dictionary = game.rounds[n]
        var forged: Dictionary
        var forged_count := 0
        var seen_ids := {}
        for candidate in round_data["cards"]:
            if seen_ids.has(candidate["object_id"]):
                _fail("duplicate source object in a round")
                return
            seen_ids[candidate["object_id"]] = true
            if candidate["is_forged"]:
                forged = candidate
                forged_count += 1
        if forged_count != 1:
            _fail("not exactly one falsified label")
            return
        if game.current_round != n:
            _fail("unexpected round index")
            return
        game._choose(forged)
        if game.points != n + 1 or not game.solved:
            _fail("correct choice was not scored")
            return
        game._next()
        await process_frame
    if game.current_round != 8 or game.points != 8:
        _fail("finishing or score incorrect")
        return
    game._next()
    await process_frame
    if game.current_round != 0 or game.points != 0:
        _fail("restart did not reset state")
        return
    # The incorrect-answer branch must not increase score.
    var first: Dictionary = game.rounds[0]
    var normal: Dictionary
    for candidate in first["cards"]:
        if not candidate["is_forged"]:
            normal = candidate
            break
    game._choose(normal)
    if game.points != 0 or not game.solved or not game.feedback.text.contains("To nie ta karta"):
        _fail("incorrect answer is not handled safely")
        return
    print("ARCHIVE_HEIST_RUNTIME_TEST: PASS 8 rounds + correct and incorrect answers + restart")
    quit(0)
