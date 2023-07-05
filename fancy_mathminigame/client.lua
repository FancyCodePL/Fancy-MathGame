local MinigameActive = false
local MinigameFinished = false
local Success = false
local SuccessTrigger = nil
local FailTrigger = nil

function StartGame(cb) 
    if MinigameActive then
        return
    end

    SetNuiFocus(true, true)
    SendNUIMessage({action = "StartMinigame"})
    MinigameActive = true
    MinigameFinished = false

    while MinigameActive do
        Citizen.Wait(500)
    end

    if cb then
        cb(Success)
    end

    return Success
end

exports('StartGame', StartGame)

RegisterNUICallback('success', function(data, cb)
    SetNuiFocus(false, false)
    Success = true
    MinigameFinished = false
    MinigameActive = false
    cb()
end)

RegisterNUICallback('failure', function(data, cb)
    SetNuiFocus(false, false)
    MinigameActive = false
    Success = false
    cb()
end)

RegisterCommand('testGame', function()
    local success = exports['fancy_mathminigame']:StartGame()
    if success == true then
        print('Hack udany')
    else
        print('Hack nieudany')
    end
end)